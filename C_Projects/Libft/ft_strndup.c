/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strndup.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/17 19:26:43 by blaine            #+#    #+#             */
/*   Updated: 2019/10/28 02:56:33 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strndup(const char *s1, size_t n)
{
	size_t	i;
	char	*cpy;

	if (!(cpy = (char*)malloc(sizeof(char) * (n + 1))))
		return (NULL);
	i = 0;
	while (s1[i] && n > 0)
	{
		cpy[i] = s1[i];
		i++;
		n--;
	}
	cpy[i] = '\0';
	return (cpy);
}
