/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsub.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 19:19:25 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:46:37 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_strsub(char const *s, unsigned int start, size_t len)
{
	char	*str;

	if (!s || ft_strlen(s) < start)
		return (NULL);
	if (!(str = ft_strnew(len)))
		return (NULL);
	str = ft_strncpy(str, s + start, len);
	return (str);
}
