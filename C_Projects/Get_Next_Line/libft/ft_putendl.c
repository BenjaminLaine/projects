/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putendl.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 20:09:09 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:55 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

void	ft_putendl(char const *s)
{
	int	i;

	i = 0;
	if (s)
	{
		while (s[i])
			i++;
		write(1, s, i);
		write(1, "\n", 1);
	}
}