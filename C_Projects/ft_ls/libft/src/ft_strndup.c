/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strndup.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/17 19:26:43 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:47:23 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_strndup(const char *s1, size_t n)
{
	char	*cpy;

	if (s1)
	{
		if (!(cpy = (char*)ft_strnew((n))))
			return (NULL);
		cpy = ft_strncpy(cpy, s1, n);
		return (cpy);
	}
	return (NULL);
}
